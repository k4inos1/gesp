
Estructura de Carpetas
CopyInsert
src/app/
├── core/
│   ├── auth/              # Autenticación
│   ├── interceptors/      # Interceptores HTTP
│   ├── services/          # Servicios globales
│   └── store/             # Estado global (NgRx)
├── modules/               # Módulos de funcionalidad
├── shared/                # Componentes reutilizables
└── app.config.ts          # Configuración global
2. Backend (NestJS)
Estructura de Carpetas
CopyInsert
src/
├── auth/                  # Módulo de autenticación
├── common/                # Utilidades comunes
├── config/                # Configuraciones
├── database/              # Configuración de TypeORM
├── modules/               # Módulos de negocio
├── shared/                # Recursos compartidos
└── main.ts                # Punto de entrada
