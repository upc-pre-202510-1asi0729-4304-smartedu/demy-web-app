import { Invoice } from '../model/invoice.entity';
import { InvoiceResource } from './invoice.response';

export class InvoiceAssembler {
  static toEntityFromResource(resource: InvoiceResource): Invoice {
    return new Invoice(resource);
  }

  static toEntitiesFromResources(resources: InvoiceResource[]): Invoice[] {
    return resources.map(this.toEntityFromResource);
  }
}
