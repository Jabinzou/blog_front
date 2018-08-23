import http from '../config/init';

export async function getList(){
  try {
    const res = await http.get('/category/list', {
      params: {
        a:1
      }
    });
    return res;
  } catch (e) {
    
  }
}