import { Rating } from "./entities/rating.entity";
import { RATING_REPOSITORY } from "src/core/constants";

export const ratingsProviders = [{
    provide: RATING_REPOSITORY,
    useValue: Rating,
}];