import { Injectable } from '@angular/core';

@Injectable()
export class UserblockService {
    private userBlockVisible: boolean;
    constructor() {
        // initially visible
        this.userBlockVisible  = true;
    }

    getVisibility() {
        return this.userBlockVisible;
    }
}
