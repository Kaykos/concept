var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var TreeDraggedElement = (function () {
    function TreeDraggedElement() {
        this._draggedElement = null;
    }
    TreeDraggedElement.prototype.set = function (draggedElement) {
        this._draggedElement = draggedElement;
    };
    TreeDraggedElement.prototype.get = function () {
        return this._draggedElement;
    };
    TreeDraggedElement.prototype.isDragging = function () {
        return !!this.get();
    };
    return TreeDraggedElement;
}());
TreeDraggedElement = __decorate([
    Injectable()
], TreeDraggedElement);
export { TreeDraggedElement };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1kcmFnZ2VkLWVsZW1lbnQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWIvbW9kZWxzL3RyZWUtZHJhZ2dlZC1lbGVtZW50Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsSUFBYSxrQkFBa0I7SUFEL0I7UUFFRSxvQkFBZSxHQUFRLElBQUksQ0FBQztJQWE5QixDQUFDO0lBWEMsZ0NBQUcsR0FBSCxVQUFJLGNBQW1CO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxnQ0FBRyxHQUFIO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGtCQUFrQjtJQUQ5QixVQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0FjOUI7U0FkWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlRHJhZ2dlZEVsZW1lbnQge1xuICBfZHJhZ2dlZEVsZW1lbnQ6IGFueSA9IG51bGw7XG5cbiAgc2V0KGRyYWdnZWRFbGVtZW50OiBhbnkpIHtcbiAgICB0aGlzLl9kcmFnZ2VkRWxlbWVudCA9IGRyYWdnZWRFbGVtZW50O1xuICB9XG5cbiAgZ2V0KCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRFbGVtZW50O1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gISF0aGlzLmdldCgpO1xuICB9XG59XG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==