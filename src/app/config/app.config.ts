export class AppConfig {
    public readonly apiUrl: string;
    public readonly jwtIssuer: string;

    constructor() {
        this.apiUrl = 'http://localhost:3012/api';
        this.jwtIssuer = 'M&A_Solutions';
    }
}
