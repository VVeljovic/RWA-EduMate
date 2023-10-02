import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, max } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
import { selectAuthToken } from '../store/auth/auth.selector';
import { Store } from '@ngrx/store';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient,private store:Store) {}
  authToken$ = this.store.select(selectAuthToken);
  public getPosts(course?:string,year?:number,sort?:string,minMark?:number,maxMark?:number,sortMarks?:string): Observable<Post[]> {
    console.log('pozvan servis'+sortMarks);
    let url = environment.api + "post/getFilteredPosts/?";

console.log(minMark+""+maxMark);
    if (course !== undefined && course !='') {
      url += `course=${course}`;
    }
  
    // Dodaj year u URL ako je definisan
    if (year !== undefined && year !==-1) {
      url += `&year=${year}`;
    }
    if (sort !== undefined && sort !=='') {
      url += `&sort=${sort}`;
      console.log(url);
    }
    if (minMark !== undefined && minMark !==-1) {
      url += `&minMark=${minMark}`;
    }
    if (maxMark !== undefined && maxMark !==-1) {
      url += `&maxMark=${maxMark}`;
    }
    if (sortMarks !== undefined && sortMarks !=='') {
      url += `&numberOfMarks=${sortMarks}`;
    }
    this.http.get<Post[]>(url).subscribe(response=>{
      console.log(response);
    })
    console.log(url);
    return this.http.get<Post[]>(url);

  }
  public createPost(body:string):Observable<Post>{
    let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
    return this.http.post<Post>(environment.api + "post", { body }, { headers });
  }
  getPostImage(imageName:string){
    const requestOptions: Object = { responseType: 'blob' };
    return this.http.get<Blob>(`${environment.api}post/post-image/${imageName}`, requestOptions);
  }
  uploadImage(file:File):Observable<any>{
    let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
    const formData = new FormData();
    formData.append('file',file);
    console.log('pozvanServisSlike');
    return this.http.post(`${environment.api}post/uploadImage/`,formData,{headers});
  }
  ratePost(postId:number,value:number){
     let jwtToken :any;
    this.authToken$.subscribe((authToken) => {
      jwtToken = authToken?.access_token;
    });    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
    });
   
     this.http.post<number>(`${environment.api}marks/${postId}`,{value},{headers}).subscribe(()=>this.http.put<number>(`${environment.api}marks/calculateAverageMarks/${postId}`,{}).subscribe((response)=>console.log(response)));

  }
  }
  
  

