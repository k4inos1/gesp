"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaludoController = void 0;
const common_1 = require("@nestjs/common");
const saludo_service_1 = require("./saludo.service");
let SaludoController = class SaludoController {
    constructor(saludoService) {
        this.saludoService = saludoService;
    }
    getSaludo() {
        return this.saludoService.getSaludo();
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], SaludoController.prototype, "getSaludo", null);
SaludoController = __decorate([
    (0, common_1.Controller)('saludo'),
    __metadata("design:paramtypes", [saludo_service_1.SaludoService])
], SaludoController);
exports.SaludoController = SaludoController;
//# sourceMappingURL=saludo.controller.js.map