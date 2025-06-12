import { Component, OnInit } from '@angular/core';

interface SensorType {
  name: string;
  description: string;
  applications: string[];
  icon: string;
}

interface Project {
  name: string;
  description: string;
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  components: string[];
  skills: string[];
  image?: string;
}

@Component({
  selector: 'app-iot-sensors-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class IotSensorsOverviewComponent implements OnInit {
  
  sensorTypes: SensorType[] = [
    {
      name: 'Sensores Ambientales',
      description: 'Miden variables del entorno como temperatura, humedad, presión atmosférica, calidad del aire, etc.',
      applications: [
        'Estaciones meteorológicas',
        'Monitoreo de calidad del aire',
        'Agricultura inteligente',
        'Domótica'
      ],
      icon: 'thermostat'
    },
    {
      name: 'Sensores de Movimiento',
      description: 'Detectan movimiento, aceleración, orientación y vibraciones.',
      applications: [
        'Sistemas de seguridad',
        'Robótica',
        'Wearables',
        'Detección de terremotos'
      ],
      icon: 'sensors'
    },
    {
      name: 'Sensores Ópticos',
      description: 'Detectan luz, color, proximidad o presencia mediante tecnologías ópticas.',
      applications: [
        'Sistemas de iluminación automática',
        'Detección de objetos',
        'Reconocimiento de gestos',
        'Medición de distancia'
      ],
      icon: 'visibility'
    },
    {
      name: 'Sensores Biométricos',
      description: 'Miden parámetros biológicos como ritmo cardíaco, oxígeno en sangre, etc.',
      applications: [
        'Dispositivos médicos',
        'Fitness trackers',
        'Autenticación biométrica',
        'Monitoreo de salud'
      ],
      icon: 'favorite'
    }
  ];

  featuredProjects: Project[] = [
    {
      name: 'Estación Meteorológica IoT',
      description: 'Crea una estación meteorológica conectada a internet que mide temperatura, humedad, presión atmosférica y calidad del aire. Los datos se visualizan en tiempo real en una aplicación web.',
      difficulty: 'Intermedio',
      components: ['ESP32', 'Sensor BME280', 'Sensor MQ-135', 'Display OLED', 'Panel Solar'],
      skills: ['Programación Arduino', 'Comunicación MQTT', 'Visualización de datos', 'Energía renovable'],
      image: 'assets/images/weather-station.jpg'
    },
    {
      name: 'Sistema de Riego Inteligente',
      description: 'Desarrolla un sistema automatizado que monitorea la humedad del suelo y activa el riego solo cuando es necesario, optimizando el uso del agua y mejorando el crecimiento de las plantas.',
      difficulty: 'Básico',
      components: ['Arduino Nano', 'Sensor de humedad del suelo', 'Módulo relé', 'Bomba de agua', 'Módulo WiFi ESP8266'],
      skills: ['Control de actuadores', 'Programación de umbrales', 'Automatización', 'IoT'],
      image: 'assets/images/smart-irrigation.jpg'
    },
    {
      name: 'Sistema de Seguridad con Reconocimiento Facial',
      description: 'Implementa un sistema de seguridad avanzado que utiliza reconocimiento facial para permitir el acceso a áreas restringidas y notifica sobre intentos de acceso no autorizados.',
      difficulty: 'Avanzado',
      components: ['Raspberry Pi', 'Cámara Pi', 'Sensor PIR', 'Cerradura electrónica', 'Pantalla táctil'],
      skills: ['Visión por computadora', 'Python', 'Machine Learning', 'Seguridad IoT'],
      image: 'assets/images/facial-recognition.jpg'
    }
  ];

  learningPath = [
    {
      level: 'Principiante',
      skills: [
        'Fundamentos de electricidad y electrónica',
        'Introducción a Arduino y microcontroladores',
        'Sensores básicos (temperatura, luz, movimiento)',
        'Programación básica en C/C++'
      ]
    },
    {
      level: 'Intermedio',
      skills: [
        'Comunicación inalámbrica (WiFi, Bluetooth, LoRa)',
        'Protocolos IoT (MQTT, HTTP)',
        'Almacenamiento y visualización de datos',
        'Integración con servicios en la nube'
      ]
    },
    {
      level: 'Avanzado',
      skills: [
        'Machine Learning aplicado a datos de sensores',
        'Sistemas distribuidos de sensores',
        'Seguridad en dispositivos IoT',
        'Desarrollo de aplicaciones móviles para IoT'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
