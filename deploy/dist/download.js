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
exports.downloadS3Folder = void 0;
const s3_js_1 = __importDefault(require("aws-sdk/clients/s3.js"));
const s3_endpoint = "https://16aa2c401244123bf49ffa092578012c.r2.cloudflarestorage.com";
const access_key_secret = "7f499ab896c634242e46e525a8d2d0ab99796a776d316437ebdfaec4824b8263";
const access_key_id = "e9b39deb33c18cb5c1b8a2915dad1798";
const bucket_name = "vercel-project";
const s3 = new s3_js_1.default({
    endpoint: s3_endpoint,
    accessKeyId: `${access_key_id}`,
    secretAccessKey: `${access_key_secret}`,
    signatureVersion: 'v4',
});
function downloadS3Folder(prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield s3.getObject({
            Bucket: bucket_name,
            Key: prefix
        }).promise();
        console.log(response);
    });
}
exports.downloadS3Folder = downloadS3Folder;
//   export async function downloadS3Folder(prefix: string) {
//     const allFiles = await s3.listObjectsV2({
//         Bucket: bucket_name,
//         Prefix: prefix
//     }).promise();
//     // // 
//     // const allPromises = allFiles.Contents?.map(async ({Key}) => {
//     //     return new Promise(async (resolve) => {
//     //         if (!Key) {
//     //             resolve("");
//     //             return;
//     //         }
//     //         const finalOutputPath = path.join(__dirname, Key);
//     //         const outputFile = fs.createWriteStream(finalOutputPath);
//     //         const dirName = path.dirname(finalOutputPath);
//     //         if (!fs.existsSync(dirName)){
//     //             fs.mkdirSync(dirName, { recursive: true });
//     //         }
//     //         s3.getObject({
//     //             Bucket: bucket_name,
//     //             Key
//     //         }).createReadStream().pipe(outputFile).on("finish", () => {
//     //             resolve("");
//     //         })
//     //     })
//     // }) || []
//     const allPromises = allFiles.Contents?.map(({Key}) => {
//         return new Promise((resolve, reject) => {
//             if (!Key) {
//                 resolve("");
//                 return;
//             }
//             const finalOutputPath = path.join(__dirname, Key);
//             const outputFile = fs.createWriteStream(finalOutputPath);
//             const dirName = path.dirname(finalOutputPath);
//             if (!fs.existsSync(dirName)){
//                 fs.mkdirSync(dirName, { recursive: true });
//             }
//             const readStream = s3.getObject({
//                 Bucket: bucket_name,
//                 Key
//             }).createReadStream();
//             readStream.on('error', (err) => {
//                 reject(err);
//             });
//             readStream.pipe(outputFile);
//             readStream.on("end", () => {
//                 outputFile.close();
//                 resolve(finalOutputPath);
//             });
//         });
//     }) || [];
//     console.log("awaiting");
//     await Promise.all(allPromises?.filter(x => x !== undefined));
// }