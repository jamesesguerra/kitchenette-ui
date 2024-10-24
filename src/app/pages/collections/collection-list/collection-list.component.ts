import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'primeng/api';
import { ToastService } from 'src/app/layout/service/toast.service';
import { Collection } from 'src/app/models/collection.model';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrl: './collection-list.component.scss'
})
export class CollectionListComponent {
  isModalVisible = false;
  showMessage = false;
  collections!: Collection[];
  typeFilter = 'Type';
  sortOption = ''

  typeOptions = [
    { name: "Public", code: "PB" },
    { name: "Private", code: "PV" },
  ];

  sortOptions = [
    { name: "Date", code: "PB" },
    { name: "Name", code: "PV" },
    { name: "Rating", code: "PV" },
  ];

  categories: any[] = [
    { name: 'Public', key: 'PB', icon: 'pi-unlock', description: 'Anyone on the internet can see this collection' },
    { name: 'Private', key: 'PV', icon: 'pi-lock', description: 'Only you can see this collection' }
  ];

  messages: Message[] = [{ severity: 'info', detail: 'You are creating a public collection' }];

  constructor(private collectionService: CollectionService, private toastService: ToastService) {
    this.collectionService.getCollections().then(collections => {
      this.collections = collections;
    });
  }

  showModal() {
    this.showMessage = true;
    this.isModalVisible = true;
  }

  hideModal() {
    this.showMessage = false;
    this.isModalVisible = false;
  }

  saveCollection() {
    this.isModalVisible = false;
    this.toastService.showSuccess("Success!", "New collection has been saved");
  }
}
