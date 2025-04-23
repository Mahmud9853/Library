import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.scss'],
})
export class ChangeRoleComponent implements OnInit {
  roles: string[] = [];
  changeRoleForm: FormGroup;
  userId: string | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.changeRoleForm = this.fb.group({
      roles: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadRoles();
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (roles) => (this.roles = roles),
      error: (err) => console.error('Error loading roles', err),
    });
  }

  onSubmit(): void {
    const selectedRole = this.changeRoleForm.get('roles')?.value;
  
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }
  
    if (this.userId) {
      this.userService
        .changeUserRole(this.userId, [selectedRole])
        .subscribe({
          next: () => {
            alert('Role updated successfully');
            this.router.navigate(['/admin/user/user-list']); // Admin paneline dön
          },
          error: (err) => console.error('Error updating role', err),
        });
    }
  }
  
}
