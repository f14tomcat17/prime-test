import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

const USER_TEST = 'test001';

const USER_PASSWORD_TEST = 'ryby3NTyKduAMcvZ';

export function authSimulationInitializer(authService: AuthService): () => Observable<any> {
  return () => authService.authenticate(USER_TEST, USER_PASSWORD_TEST);
}
