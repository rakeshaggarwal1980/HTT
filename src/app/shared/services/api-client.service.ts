import { Injectable, HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from 'vendor/angular';
import { Observable, pipe } from 'rxJs';
import { filter, map } from 'rxjs/operators';
import { Registration } from 'app/registration/shared/registration.model';
import { HTTP_REQUEST_TYPE, SORT_DIRECTION } from 'app/app.enum';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ApiClientService {
    domain: string;
    public defaultHeaders: Headers = new Headers();
    constructor(private http: HttpClient) {
        this.domain = '';
    }


    /**
     *
     * @method
     * @name 
     * @param {EmployeeViewModel} employeeViewModel - object of data i.e. name, password and employeeCode etc.
     *
     */

    public Employee_Employee(employeeViewModel: any): Observable<any> {

        return this.sendRequest('/api/employee', HTTP_REQUEST_TYPE.POST, JSON.stringify(employeeViewModel), null);
    }



    private sendRequest(apiPath: string, requestType: string, requestBody?: any, queryParameters?: any[]) {
        const _headers = new HttpHeaders();
        const headers = _headers.append('Content-Type', 'application/json')
            .append('Accept', 'application/json');

        let params = new HttpParams();
        if (!isNullOrUndefined(queryParameters) && queryParameters.length > 0) {
            queryParameters.forEach((parameter: any) => {
                params = params.set(parameter.key, parameter.value);
            });
        }
        if (isNullOrUndefined(requestBody)) {
            requestBody = {};
        }

        const request = new HttpRequest<any>(
            requestType,
            this.domain + apiPath,
            requestBody,
            {
                headers: headers,
                params: params,
                responseType: 'json'
            });

        return this.http.request<any>(request)
            .pipe(
                filter(r => r instanceof HttpResponse),
                map(r => {
                    const resp = r as HttpResponse<any>;
                    let responseBody: string = null;
                    responseBody = resp.body as string;
                    return responseBody;
                })
            );
    }



    /**
     *
     * @method
     * @name Request_Requests
     *
     */
    public Request_Requests(): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/request/requests', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

    /**
         *
         * @method
         * @name 
         * @param {loginDetails} any - object of data i.e. email, password etc.
         *
         */

    public Login_Login(loginDetails: any): Observable<any> {

        return this.sendRequest('/api/login', HTTP_REQUEST_TYPE.POST, JSON.stringify(loginDetails), null);
    }


    /**
         *
         * @method
         * @name 
         * @param {request} any - object of request data
         *
         */

    public Request_CreateRequest(request: any): Observable<any> {

        return this.sendRequest('/api/request/request', HTTP_REQUEST_TYPE.POST, JSON.stringify(request), null);
    }


    /**
 *
 * @method
 * @name Health_DeclarationData
 *
 */
    public Health_DeclarationData(): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/health/declarationData', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }


    /**
     *
     * @method
     * @name 
     * @param {declarationData} any - object of data i.e. email, password etc.
     *
     */

    public Health_PostDeclarationData(declarationData: any): Observable<any> {

        return this.sendRequest('/api/health/declarationData', HTTP_REQUEST_TYPE.POST, JSON.stringify(declarationData), null);
    }

    /**
     *
     * @method
     * @name Health_GetEmployeeSelfDeclaration
     *
   */
    public Health_GetEmployeeSelfDeclaration(employeeId: number, requestNumber: string): Observable<any> {
        const queryParameters = [];

        if (!isNullOrUndefined(employeeId) && employeeId !== 0) {
            queryParameters.push({ key: 'employeeId', value: employeeId });
        }
        if (!isNullOrUndefined(requestNumber)) {
            queryParameters.push({ key: 'requestNumber', value: requestNumber });
        }

        return this.sendRequest('/api/health/selfDeclaration', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

    /**
     *
     * @method
     * @name Request_Requests
     *
     */
    public Request_PutRequest(request: any): Observable<any> {
        return this.sendRequest('/api/request/request', HTTP_REQUEST_TYPE.PUT, JSON.stringify(request), null);
    }

    /**
 *
 * @method
 * @name Request_RequestsByUserId
 *
 */
    public Request_RequestsByUserId(userId: number): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/request/requests/' + userId, HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }


    /**
    *
    * @method
    * @name Role_Roles
    *
    */
    public Role_Roles(): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/role/roles', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

    /**
     *
     * @method
     * @name Employee_EmployeebyId
     *
     */
    public Employee_EmployeebyId(userId: number): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/employee/employeebyid/' + userId, HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

    /**
     *
     * @method
     * @name Employee_EmployeebyId
     *
     */
    public Employee_UpdateAccountStatus(userId: number, status: any): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('api/employee/accountstatus/' + userId + "/" + status, HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

    /**
*
* @method
* @name Employee_Employees
*
*/
    public Employee_Employees(): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/employee/list', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }


    /**
 *
 * @method
 * @name 
 * @param {SearchSortModel} searchSortModel - object of data i.e. name, password and employeeCode etc.
 *
 */

    public Health_Declarations(searchSortModel: any): Observable<any> {
        return this.sendRequest('/api/health/declarations', HTTP_REQUEST_TYPE.POST, JSON.stringify(searchSortModel), null);
    }

    /**
*
* @method
* @name Health_GetDeclarationsToExport
*
*/
    public Health_GetDeclarationsToExport(): Observable<any> {
        const queryParameters = [];
        return this.sendRequest('/api/health/declarationList', HTTP_REQUEST_TYPE.GET, null, queryParameters);
    }

}
