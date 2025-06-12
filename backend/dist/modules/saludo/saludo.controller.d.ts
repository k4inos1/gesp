import { SaludoService } from './saludo.service';
export declare class SaludoController {
    private readonly saludoService;
    constructor(saludoService: SaludoService);
    getSaludo(): string;
}
