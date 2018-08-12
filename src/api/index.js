import http from '../config/init';

export async function getList(){
  try {
    const res = await http.get('/category/list');
    return res;
  } catch (e) {
    
  }
}