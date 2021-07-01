import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import {getConfig} from '../../config/config';
import Customer from '../resources/customer/customer.model';
import response from "../helpers/response";

const config = getConfig(process.env.NODE_ENV);

aws.config.update({
    secretAccessKey: config.aws_secret_access_key,
    accessKeyId: config.aws_key_id,
    region: config.region
});
const s3 = new aws.S3();

export const upload = {
    storage: multerS3({
        s3: s3,
        bucket: config.bucket,
        key: function (req, file, next) {
            const ext = file.mimetype.split('/')[1];
            next(null, "photo" + req.user._id + "." + ext);
        }
    }),
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: async (req, file, next) => {
        if (!file) {
            next();
        }

        const customer = await Customer.findById({_id: req.user._id});

        if (customer === null) {
            return res.status(404).json(response.error('NOT_FOUND', 'Customer data not found', 404));
        }

        const image = file.mimetype.startsWith('image/');

        if (image) {
            await s3.deleteObject({
                Bucket: config.bucket,
                Key: customer.image.original.title
            }, (err, data) => {
            });
            next(null, true);
        } else {
            return next();
        }
    }
};