// import { Injectable } from 'vendor/angular';
// import { Observable } from 'vendor/rxJs';
// import { ApiClientService } from 'app/shared/services/api-client.service';
// import { isNullOrUndefined } from 'util';


// @Injectable()
// export class CommonService {
//     constructor(private apiClientService: ApiClientService) {
//     }

//     // Returns list of partners
//     getPartners(searchText: string, pageNumber: number, pageSize: number,
//         sortColumn?: string, sortDirection?: string): Observable<any> {
//         return this.apiClientService.Partner_Partners(searchText, pageNumber, pageSize, sortColumn, sortDirection);
//     }
//     // get File details
//     getFileDetails(fileId: string) {
//         return this.apiClientService.File_Detail(fileId);
//     }
//     // get users
//     getUsers() {
//         return this.apiClientService.User_Users();
//     }

//     getLocations(searchText: string, pageNumber: number, pageSize: number,
//         sortColumn?: string, sortDirection?: string
//     ): Observable<any> {
//         return this.apiClientService.Location_Locations(searchText, pageNumber, pageSize, sortColumn, sortDirection);
//     }

//     getLicenses(searchText: string, pageNumber: number, pageSize: number,
//         sortColumn?: string, sortDirection?: string
//     ): Observable<any> {
//         return this.apiClientService.Licence_Licences(searchText, pageNumber, pageSize, sortColumn, sortDirection);
//     }


//     getUserInfo(userName: string) {
//         return this.apiClientService.User_GetUser(userName);
//     }

//     getPartDescription(partDetail: any, partType: string): any {
//         let partDescription = '';
//         if (!isNullOrUndefined(partDetail.description) && partDetail.description !== '') {
//             partDescription = partDetail.description + ', ';
//         }
//         if (partType === PART_TYPE.MATERIAL) {
//             if (!isNullOrUndefined(partDetail.manufactorName) && partDetail.manufactorName !== '') {
//                 partDescription += partDetail.manufactorName + ', ';
//             }
//             if (!isNullOrUndefined(partDetail.manufactorPartNumber) && partDetail.manufactorPartNumber !== '') {
//                 partDescription += partDetail.manufactorPartNumber;
//             }
//         } else if (partType === PART_TYPE.EQUIPMENT) {
//             if (!isNullOrUndefined(partDetail.vendor) && partDetail.vendor !== '') {
//                 partDescription += partDetail.vendor + ', ';
//             }
//             if (!isNullOrUndefined(partDetail.vendorPartNumber) && partDetail.vendorPartNumber !== '') {
//                 partDescription += partDetail.vendorPartNumber;
//             }
//         }
//         return partDescription;
//     }
// }
