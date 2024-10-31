import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { CollectionDto } from 'src/app/dtos/collection.dto';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { Recipe } from 'src/app/models/recipe.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss'
})
export class EditCollectionComponent implements OnInit {
  @Input({ required: true }) items: Recipe[] = [];
  @Input({ required: true }) collection: Collection;
  @Output() save = new EventEmitter<CollectionDto>();
  @Output() cancel = new EventEmitter();

  collectionForm!: FormGroup;

  constructor(private collectionService: CollectionService,
    private toastService: ToastService) { }

  deleteRecipe(id: number) {
    this.items = this.items.filter(i => i.id !== id);
  }

  ngOnInit(): void {
    this.collectionForm = new FormGroup({
      name: new FormControl(this.collection.name, { validators: [Validators.required] }),
      description: new FormControl(this.collection.description)
    })
  }

  onSubmit() {
    const { name, description } = this.collectionForm.value as Collection;

    this.collectionService.updateCollection(this.collection.id, name, description).subscribe({
      next: () => {
        this.toastService.showSuccess("Success!", "Collection has been updated");
        this.save.emit({ name, description, recipes: this.items })
      },
      error: ({ error }) => {
        this.toastService.showError("Error", error.title);
      }
    })
  }

  onCancel() {
    this.cancel.emit();
  }
}