import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
import { JwtService } from 'src/app/services/jwt.service';
import { LoginService } from 'src/app/services/login.service';
import { MediaService } from 'src/app/services/media.service';
import { MessageService } from 'src/app/services/message.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  loading = true;
  img: File | undefined = undefined;
  editProfileForm = new UntypedFormGroup({
    avatar: new UntypedFormControl('', []),
    name: new FormControl('', Validators.required),
    disableNSFWFilter: new UntypedFormControl(false, []),
    disableGifsByDefault: new UntypedFormControl(false, []),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private jwtService: JwtService,
    private dashboardService: DashboardService,
    private mediaService: MediaService,
    private loginService: LoginService,
    private messages: MessageService,
    private themeService: ThemeService
  ) {
    this.themeService.setTheme('');
  }

  ngOnInit(): void {
    this.dashboardService
      .getBlogDetails(this.jwtService.getTokenData()['url'])
      .then(async (blogDetails) => {
        blogDetails['avatar'] = undefined;
        this.editProfileForm.patchValue(blogDetails);
        this.editProfileForm.controls['disableNSFWFilter'].patchValue(
          this.mediaService.checkNSFWFilterDisabled
        );
        this.loading = false;
      });
  }

  imgSelected(filePickerEvent: any) {
    if (filePickerEvent.target.files[0]) {
      this.img = filePickerEvent.target.files[0];
    }
  }

  async onSubmit() {
    this.loading = true;
    try {
      const res = await this.loginService.updateProfile(
        this.editProfileForm,
        this.img
      );
      this.messages.add({
        severity: 'success',
        summary: 'Your profile was updated!',
      });
    } catch (error) {
      this.messages.add({
        severity: 'error',
        summary: 'Something went wrong',
      });
      console.error(error);
    }
    this.loading = false;
  }
}
