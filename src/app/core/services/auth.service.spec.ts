import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

// Mocks
const mockUser: Partial<User> = {
  uid: '123',
  email: 'test@example.com',
  displayName: 'Test User',
  emailVerified: false,
  photoURL: null,
  phoneNumber: null,
  metadata: {},
  providerData: [],
  isAnonymous: false,
  refreshToken: '',
  tenantId: null,
  providerId: 'password',
  delete: () => Promise.resolve(),
  getIdToken: () => Promise.resolve('mock-token'),
  getIdTokenResult: () => Promise.resolve({
    token: 'mock-token',
    claims: {},
    expirationTime: new Date(Date.now() + 3600 * 1000).toISOString(),
    issuedAtTime: new Date().toISOString(),
    signInProvider: 'password',
    signInSecondFactor: null,
    authTime: new Date().toISOString(),
  }),
  reload: () => Promise.resolve(),
  toJSON: () => ({}),
};

const mockUserCredential: UserCredential = {
  user: mockUser as User,
  providerId: 'password',
  operationType: 'signIn'
};

describe('AuthService', () => {
  let service: AuthService;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    // Crear spies
    const userService = jasmine.createSpyObj('UserService', ['createUser', 'getUser']);
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

    // Configurar respuestas por defecto para los spies
    userServiceSpy.createUser.and.returnValue(Promise.resolve());
userServiceSpy.getUser = jasmine.createSpy('getUser').and.returnValue(of({
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      emailVerified: false,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {}
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
      // Configurar
      const loginData = {
        email: 'test@example.com',
        password: '123456'
      };

      // Actuar
      const result = await service.login(loginData);

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
      await expectAsync(service.login({
        email: 'test@example.com',
        password: 'contraseña-incorrecta'
      })).toBeRejectedWith(error);
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

  describe('currentUser$', () => {
    it('debería emitir el usuario actual', (done) => {
      // Configurar
      const userData = {
        uid: '123',
        email: 'test@example.com',
        displayName: 'Test User',
        emailVerified: false,
        role: 'user',
        status: 'active',
        preferences: {}
      };

      // Actuar
      service.currentUser$.pipe(take(1)).subscribe(user => {
        // Afirmar
        if (user) {
          // Verificar solo las propiedades que nos interesan
          expect(user.uid).toBe(userData.uid);
          expect(user.email).toBe(userData.email);
          expect(user.displayName).toBe(userData.displayName);
          expect(user.role).toBe(userData.role);
          done();
        } else {
          fail('Se esperaba un usuario');
        }
      });
    });
  });

  describe('isAuthenticated', () => {
    it('debería devolver true si hay un usuario autenticado', () => {
      // Configurar
      const mockCurrentUser = { uid: '123', email: 'test@example.com' };
      Object.defineProperty(service, 'currentUserValue', { get: () => mockCurrentUser });

      // Actuar
      const result = service.isAuthenticated;

      // Afirmar
      expect(result).toBeTrue();
    });

    it('debería devolver false si no hay usuario autenticado', () => {
      // Configurar
      Object.defineProperty(service, 'currentUserValue', { get: () => null });

      // Actuar
      const result = service.isAuthenticated;

      // Afirmar
      expect(result).toBeFalse();
    });
  });
});
