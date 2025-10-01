import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList } from "@angular/core";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { addItem, any, isDefined, removeItem, firstItem, firstOrDefault, hasItem } from "ngx-sfc-common";
import { CarouselOptionsModel, CarouselResponsiveModel } from "ngx-sfc-components";
import { BaseInputComponent } from "../base/base-input.component";
import { CarouselInputSlideDirective } from "./directives/carousel-input-slide.directive";
import { ICarouselInputSlideContextModel } from "./directives/models/carousel-input-slide-context.model";

@Component({
    selector: 'sfc-carousel-input',
    templateUrl: './carousel-input.component.html',
    styleUrls: [
        '../../styles/input.component.scss',
        '../../styles/vertical-input.component.scss',
        './carousel-input.component.scss'
    ]
})
export class CarouselInputComponent
    extends BaseInputComponent<number | number[]>
    implements AfterContentInit, OnInit {

    @Input()
    multiple: boolean = false;

    @Input()
    dots: boolean = false;

    @Input()
    navigation: boolean = true;

    @Input()
    loop: boolean = true;

    @Input()
    carouselResponsiveModel!: CarouselResponsiveModel;

    @Input()
    items?: number;

    @ContentChildren(CarouselInputSlideDirective)
    slides!: QueryList<CarouselInputSlideDirective>;

    public carouselOptions: CarouselOptionsModel = {
        center: false,
        navSpeed: 700,
        navBottom: false,
        navIcons: [faChevronLeft, faChevronRight]
    }

    private get multipleValue(): number[] { return this.value as number[]; }

    ngOnInit(): void {
        this.carouselOptions.dots = this.dots;
        this.carouselOptions.loop = this.loop;
        this.carouselOptions.nav = this.navigation;

        if (isDefined(this.items))
            this.carouselOptions.items = this.items;

        if (this.carouselResponsiveModel)
            this.carouselOptions.responsive = this.carouselResponsiveModel;

        this.initValue();
    }

    ngAfterContentInit(): void {
        this.initCarouselStartPosition();
    }

    public onCheck(slide: CarouselInputSlideDirective): void {
        if (this.multiple) {
            const item: number | undefined = firstOrDefault(this.multipleValue,
                value => value === slide.key);

            if (isDefined(item))
                removeItem(this.multipleValue, item);
            else
                addItem(this.multipleValue, slide.key);

            this.onChange(this.value);
        } else {
            if (this.value != slide.key) {
                this.value = slide.key;
                this.onChange(this.value);
            }
        }
    }

    public buildSlideContext(slide: CarouselInputSlideDirective): ICarouselInputSlideContextModel {
        return {
            selected: this.multiple ? hasItem(this.multipleValue, slide.key) : this.value === slide.key
        };
    }

    private initValue(): void {
        if (this.hasValue) {
            if (this.multiple) {
                if (!Array.isArray(this.value)) {
                    this.value = [this.value!];
                }
            } else {
                if (Array.isArray(this.value)) {
                    this.value = this.value[0];
                }
            }
        } else {
            this.value = this.multiple ? [] : null;
        }
    }

    private initCarouselStartPosition(): void {
        const selectedSlide: CarouselInputSlideDirective | undefined = firstOrDefault(this.slides.toArray(),
            (item: CarouselInputSlideDirective) => {
                if (this.multiple) {
                    return any(this.value as number[])
                        ? item.key === firstItem((this.value as number[]))
                        : false;
                } else {
                    return item.key === this.value;
                }
            });

        this.carouselOptions.startPosition = selectedSlide
            ? this.slides.toArray().indexOf(selectedSlide)
            : 0;
    }
}