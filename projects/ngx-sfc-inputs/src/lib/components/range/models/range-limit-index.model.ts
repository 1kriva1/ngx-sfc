import { RangeLimitInputState } from "../enums/range-limit-input-state.enum";

export interface IRangeLimitIndexModel {
    from: RangeLimitInputState;
    to: RangeLimitInputState;
}