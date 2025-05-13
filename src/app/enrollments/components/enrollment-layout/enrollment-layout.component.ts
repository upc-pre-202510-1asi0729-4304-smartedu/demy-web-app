import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { ContextualToggleNavComponent } from '../../../shared/components/contextual-toggle-nav/contextual-toggle-nav.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-enrollment-layout',
  imports: [
    RouterOutlet,
    ContextualToggleNavComponent
  ],
  templateUrl: './enrollment-layout.component.html',
  styleUrls: ['./enrollment-layout.component.css']
})
export class EnrollmentLayoutComponent implements OnInit {
  toggleOptions = [
    { label: 'Registrar Matricula', value: '' },  // Cambiado a valor vacío para la ruta base
    { label: 'Gestión de Estudiantes', value: 'students' },
    { label: 'Períodos Académicos', value: 'academic-periods' }
  ];

  selectedView = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Establecer la opción seleccionada inicial basada en la URL actual
    this.updateSelectedViewFromUrl(this.router.url);

    // Suscribirse a cambios en la navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateSelectedViewFromUrl(event.url);
    });
  }

  updateSelectedViewFromUrl(url: string) {
    if (url === '/enrollment') {
      // Si estamos en la ruta base de enrollment
      this.selectedView = '';
      return;
    }

    // Buscar la opción correspondiente a la URL actual
    const urlSegments = url.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];

    const match = this.toggleOptions.find(opt => opt.value === lastSegment);
    if (match) {
      this.selectedView = match.value;
    } else {
      // Si no hay coincidencia, establecer a la vista principal por defecto
      this.selectedView = '';
    }
  }

  onToggleSelect(view: string) {
    this.selectedView = view;

    if (view === '') {
      // Si se selecciona la opción principal, navegar a la ruta base de enrollment
      void this.router.navigate(['/enrollment']);
    } else {
      // Para otras opciones, navegar a la subruta correspondiente
      void this.router.navigate([`/enrollment/${view}`]);
    }
  }
}
