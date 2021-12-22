import { getRepository } from "typeorm"
import { Video } from "../entities/Video";

type VideoUpdateRequest = {
    id: string;
    name: string;
    description: string;
    category_id: string;
    duration: number;
}

export class UpdateVideoService{
    async execute({id, name, description, category_id, duration}: VideoUpdateRequest){
        const repo = getRepository(Video);
        const video = await repo.findOne(id);

        if(!video){
            return new Error("Video does not exists!");
        }

        video.name = name ? name : video.name;
        video.description = description ? description : video.description;
        video.category_id = category_id ? category_id : video.category_id;
        video.duration = duration ? duration : video.duration;

        await repo.save(video);
        return video;
    }
}