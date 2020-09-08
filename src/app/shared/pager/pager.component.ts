import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } 
from '@angular/core';
import { PagerService } from 'app/shared/pager/pager.service';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'evry-pager',
    templateUrl: 'pager.component.html',
    styleUrls: ['pager.component.scss']
})

export class PagerComponent implements OnChanges {

    @Input() data: any;
    pager: any = {};
    pageInfo: any = {};
    @Output() onPageChange = new EventEmitter();
    constructor(private pagerService: PagerService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        const data: SimpleChange = changes.data;
        if (data && !isNullOrUndefined(data.currentValue)) {
            this.pageInfo = data.currentValue;
            this.createPager(this.pageInfo.CurrentPage);
        }
    }

    createPager(page) {
        if (page < 1 || page > this.pager.TotalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.pageInfo.TotalCount, this.pageInfo.TotalPages,
            page, this.pageInfo.PageSize);
    }

    setPage(page: number) {
        this.createPager(page);
        this.onPageChange.emit(page);
    }
}
