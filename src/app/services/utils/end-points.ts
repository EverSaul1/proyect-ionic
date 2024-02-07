import {environment} from "../../../environments/environment";

const scary_b = environment.baseUrl

export const END_POINTS = {
  scary_base: scary_b + '/api',
  base_back: {
    history: 'history',
    category: 'category',
    comentarios: 'comments'
  }
}

