export class DropzoneCoverConfig {
    public readonly url: string;
    public readonly method: string;
    public readonly autoProcessQueue: boolean;
    public readonly maxFilesize: number;
    public readonly acceptedFiles: string;
    public readonly dictDefaultMessage: string;
    public readonly maxFiles: number;
    public readonly MAX_FILE_SIZE = 16;

    constructor() {
        this.url = 'http://localhost:3012/api/jobs/upload-cover';
        this.method = 'POST';
        this.autoProcessQueue = true;
        this.acceptedFiles = '.pdf, .doc, .docx';
        this.maxFilesize = this.MAX_FILE_SIZE;
        this.dictDefaultMessage = 'Upload your Cover letter (optional)';
        this.maxFiles = 1;
    }
}
