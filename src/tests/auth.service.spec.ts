import { Observable } from 'rxjs';
import { AuthService } from '../app/core/auth.service';

describe('Service: AuthService', () => {
    let user: { email: string; password: string };
    let service: AuthService;
    const router = {};
    let jwtService;
    let httpClient;
    let appConfig;

    beforeEach(() => {
        jwtService = {
            tokenGetter: () => { },
            decodeToken: () => { },
            isTokenExpired: () => { },
        };

        httpClient = {
            post: jasmine.createSpy('post'),
        };

        appConfig = {
            apiUrl: 'apiUrl',
            jwtIssuer: 'issuer',
        };

        user = {
            email: 'userEmail',
            password: 'userPassword',
        };

        service = new AuthService(httpClient, appConfig, jwtService as any, router as any);
    });

    describe('-login', () => {

        it('if http.post has been called with correct parameters', () => {
            service = new AuthService(httpClient, appConfig, <any>jwtService, router);

            // act
            let urlCalled;
            let userCalled;

            httpClient.post.and.callFake((url, user, options) => {
                [urlCalled, userCalled] = [url, user];

                return Observable.of({});
            });


            service.login(user, <any>{});

            expect(httpClient.post).toHaveBeenCalledWith(urlCalled, userCalled, {});
        });
    });

    describe('-isAuthenticated', () => {
        let isAuthenticated;

        it('if there is no token, session and local storage should be cleared', () => {
            spyOn(jwtService, 'isTokenExpired').and.returnValue(true);

            spyOn(localStorage, 'removeItem');
            spyOn(sessionStorage, 'removeItem');


            service.isAuthenticated();

            expect(localStorage.removeItem).toHaveBeenCalled();
            expect(sessionStorage.removeItem).toHaveBeenCalled();
        });

        it('if there is token, session and local storage shouldn`t be cleared', () => {
            spyOn(jwtService, 'isTokenExpired').and.returnValue(false);

            spyOn(localStorage, 'removeItem');
            spyOn(sessionStorage, 'removeItem');


            service.isAuthenticated();

            expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
            expect(sessionStorage.removeItem).toHaveBeenCalledTimes(0);
        });

        it('if there is token and it isn`t expired, should return true', () => {
            spyOn(jwtService, 'tokenGetter').and.returnValue(true);
            spyOn(jwtService, 'decodeToken').and.returnValue({ iss: 'issuer' });

            isAuthenticated = service.isAuthenticated();

            expect(isAuthenticated).toEqual(true);
        });

        it('if there is token and it is expired, should return false', () => {
            spyOn(jwtService, 'tokenGetter').and.returnValue(true);
            spyOn(jwtService, 'decodeToken').and.returnValue({ iss: '' });

            isAuthenticated = service.isAuthenticated();

            expect(isAuthenticated).toEqual(false);
        });

        it('if there isn`t token, should return false', () => {
            spyOn(jwtService, 'isTokenExpired').and.returnValue(true);

            isAuthenticated = service.isAuthenticated();

            expect(isAuthenticated).toEqual(false);
        });

        it('if there is token and it isn`t expired but the issuer isn`t the same, should return false', () => {
            spyOn(jwtService, 'tokenGetter').and.returnValue(true);
            spyOn(jwtService, 'decodeToken').and.returnValue({ iss: 'bbb' });

            isAuthenticated = service.isAuthenticated();

            expect(isAuthenticated).toEqual(false);
        });
    });
});
