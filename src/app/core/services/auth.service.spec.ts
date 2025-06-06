import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { of, throwError } from 'rxjs';

// Mocks
const mockUser: Partial<User> = {
  uid: '123',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: false,
};

const mockUserCredential: UserCredential = {
  user: mockUser as User,
  providerId: 'password',
  operationType: 'signIn'
};

describe('AuthService', () => {
  let service: AuthService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authSpy: jasmine.SpyObj<Auth>;

  beforeEach(() => {
    // Crear spies
    const userService = jasmine.createSpyObj('UserService', ['createUser', 'getUserData']);
    const auth = jasmine.createSpyObj('Auth', [
      'signOut',
      'onAuthStateChanged',
      'currentUser'
    ], {
      currentUser: mockUser
    });

    // Configurar los mocks de las funciones de Firebase
    (createUserWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.resolve(mockUserCredential));
    (signInWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.resolve(mockUserCredential));
    (signOut as jasmine.Spy).and.returnValue(Promise.resolve());

    // Configurar el módulo de pruebas
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: Auth, useValue: auth }
      ]
    });

    // Inyectar el servicio y los spies
    service = TestBed.inject(AuthService);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authSpy = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;

    // Configurar respuestas por defecto para los spies
    userServiceSpy.createUser.and.returnValue(Promise.resolve());
    userServiceSpy.getUserData.and.returnValue(of({
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      role: 'user'
    }));
  });

  it('debería crearse', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
      // Configurar
      const userData = {
        email: 'test@example.com',
        password: '123456',
        name: 'Test User'
      };

      // Actuar
      const result = await service.register(userData);

      // Afirmar
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        jasmine.any(Object), 
        'test@example.com', 
        '123456'
      );
      expect(userServiceSpy.createUser).toHaveBeenCalledWith(jasmine.objectContaining({
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'user'
      }));
      expect(result).toEqual(mockUserCredential);
    });

    it('debería manejar errores durante el registro', async () => {
      // Configurar para que falle
      const error = { code: 'auth/email-already-in-use' };
      (createUserWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.reject(error));

      // Actuar y Afirmar
      await expectAsync(service.register({
        email: 'existente@example.com',
        password: '123456',
        name: 'Usuario Existente'
      })).toBeRejectedWith(error);
    });
  });

  describe('login', () => {
    it('debería iniciar sesión correctamente', async () => {
      // Actuar
      const result = await service.login('test@example.com', '123456');

      // Afirmar
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        jasmine.any(Object), 
        'test@example.com', 
        '123456'
      );
      expect(result).toEqual(mockUserCredential);
    });

    it('debería manejar errores durante el inicio de sesión', async () => {
      // Configurar para que falle
      const error = { code: 'auth/wrong-password' };
      (signInWithEmailAndPassword as jasmine.Spy).and.returnValue(Promise.reject(error));

      // Actuar y Afirmar
      await expectAsync(service.login('test@example.com', 'contraseña-incorrecta'))
        .toBeRejectedWith(error);
    });
  });

  describe('logout', () => {
    it('debería cerrar sesión correctamente', async () => {
      // Actuar
      await service.logout();

      // Afirmar
      expect(signOut).toHaveBeenCalled();
    });

    it('debería manejar errores durante el cierre de sesión', async () => {
      // Configurar para que falle
      const error = new Error('Error de red');
      (signOut as jasmine.Spy).and.returnValue(Promise.reject(error));

      // Actuar y Afirmar
      await expectAsync(service.logout()).toBeRejectedWith(error);
    });
  });

  describe('getCurrentUser', () => {
    it('debería devolver el usuario actual', (done) => {
      // Configurar
      const userData = {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        role: 'user'
      };

      // Actuar
      service.getCurrentUser().subscribe(user => {
        // Afirmar
        expect(user).toEqual(userData);
        done();
      });
    });
  });

  describe('isAuthenticated', () => {
    it('debería devolver true si hay un usuario autenticado', (done) => {
      // Actuar
      service.isAuthenticated().subscribe(isAuth => {
        // Afirmar
        expect(isAuth).toBeTrue();
        done();
      });
    });
  });
});
