import { Directive, HostListener, Input, ElementRef } from "@angular/core";

@Directive({
  selector: "[onlyNumber]"
})
export class OnlyNumberDirective {
  regexStr = "^[0-9]*$";
  regEx = new RegExp(this.regexStr);
  @Input() onlyNumber: boolean;
  constructor(private el: ElementRef) {}

  @HostListener("input", ["$event"]) oninput(event) {
    let e = <InputEvent>event;
    if (this.onlyNumber && e.inputType != "deleteContentBackward") {
      if (this.regEx.test(this.el.nativeElement.value)) {
        return;
      } else {
        console.log(e.detail)
        this.el.nativeElement.value = this.strEegEx(
          this.el.nativeElement.value
        );
      }
    }
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event) {
    let e = <KeyboardEvent>event;
    if (this.onlyNumber) {
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (
        (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
        (e.keyCode < 96 || e.keyCode > 105) &&
        e.keyCode != 229
      ) {
        e.preventDefault();
      }
    }
  }

  private strEegEx(s: string): string {
    let newStr = s.split("").map(x => {
      if (this.regEx.test(x)) {
        return x;
      } else {
        return "";
      }
    });
    return newStr.join("");
  }
}
