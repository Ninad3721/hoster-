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
const redis_1 = require("redis");
const express_1 = __importDefault(require("express"));
const getAllFiles_1 = __importDefault(require("./getAllFiles"));
const uploadBuild_1 = __importDefault(require("./uploadBuild"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const publisher = (0, redis_1.createClient)();
publisher.connect();
const port = 5001;
//function to loop the queue
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (1) {
            const res = yield publisher.brPop((0, redis_1.commandOptions)({ isolated: true }), 'repo-queue', 0);
            //@ts-ignore
            //   await  downloadS3Folder(`out/${res.element}`)
            //   console.log("Downloaded file")
            //@ts-ignore
            //  await  execute( `out/${res.element}`)
            //   console.log("File builded")
            //@ts-ignore
            const fileArray = yield (0, getAllFiles_1.default)(path_1.default.join(__dirname + `/out/${res.element}/build`));
            console.log(fileArray);
            fileArray.forEach((file) => {
                const path = file.toString();
                const parts = path.split("\\"); // Split the string by "/"
                const extractedPath = parts.slice(5).join("/");
                console.log(extractedPath);
                (0, uploadBuild_1.default)(`dist/${extractedPath}`, file);
            });
            console.log("✅ Build Uploaded");
            //@ts-ignore
            publisher.hSet('repo-status', res.element, 'done');
            // console.log(res.element)
        }
    });
}
main();
app.listen(port, () => {
    console.log("listening on port" + port);
});
