import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import {getConfig} from '../../config/config';
import Customer from '../resources/customer/customer.model';
import response from "../helpers/response";

const config = getConfig(process.env.NODE_ENV);

const spacesEndpoint = new aws.Endpoint(config.do_space_endpoint);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: config.aws_key_id,
    secretAccessKey: config.aws_secret_access_key,
    region: config.region
});

export const upload = {
    storage: multerS3({
        s3: s3,
        bucket: config.bucket,
        acl: 'public-read',
        key: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1];
            cb(null, "photo" + req.user._id+'.'+ext);
        }
    }),
    limits: {fileSize: 2 * 1024 * 1024},
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