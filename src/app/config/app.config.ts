export class AppConfig {
    private readonly apiUrl: string;
    private readonly jwtIssuer: string;

    constructor() {
        this.apiUrl = 'http://localhost:3012/api';
        this.jwtIssuer = 'M&A_Solutions';
    }
}
