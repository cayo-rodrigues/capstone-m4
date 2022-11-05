"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const ProductFeedback_model_1 = __importDefault(require("../../models/ProductFeedback.model"));
const utils_1 = require("../../utils");
class ListProductFeedbacksService {
    static execute({ per_page, page }) {
        return __awaiter(this, void 0, void 0, function* () {
            const productFeedbackRepository = data_source_1.default.getRepository(ProductFeedback_model_1.default);
            if (!per_page) {
                per_page = 20;
            }
            if (!page) {
                page = 1;
            }
            const count = yield productFeedbackRepository.count();
            const pages = Math.ceil(count / per_page);
            const prev = page <= 1
                ? null
                : `${(0, utils_1.getUrl)()}/feedbacks/products?per_page=${per_page}&page=${page - 1}`;
            const next = page >= pages
                ? null
                : `${(0, utils_1.getUrl)()}/feedbacks/products?per_page=${per_page}&page=${page + 1}`;
            const productFeedbacks = yield productFeedbackRepository.find({
                skip: per_page * (page - 1),
                take: per_page,
            });
            return {
                results: productFeedbacks,
                info: {
                    count,
                    pages,
                    next,
                    prev,
                },
            };
        });
    }
}
exports.default = ListProductFeedbacksService;
