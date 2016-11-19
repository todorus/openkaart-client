import { Region } from './region';
import { Pagination } from '../general/pagination';

export class RegionResponse {
  data :Array<Region>
  pages :Pagination;
}
