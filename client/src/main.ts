import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AppComponent } from './app/app';
import { provideRouter, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './services/token.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));
