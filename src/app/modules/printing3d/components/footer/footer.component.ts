import { Component } from '@angular/core';

@Component({
  selector: 'app-printing3d-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class Printing3dFooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/maker_iot' },
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/maker_iot' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/maker_iot' },
    { name: 'YouTube', icon: 'youtube_searched_for', url: 'https://youtube.com/maker_iot' }
  ];
  
  quickLinks = [
    { name: 'Política de Privacidad', url: '/privacy-policy' },
    { name: 'Términos de Uso', url: '/terms-of-use' },
    { name: 'Contacto', url: '/contact' },
    { name: 'Acerca de', url: '/about' }
  ];
}
