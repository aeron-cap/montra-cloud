import { config } from 'dotenv';
import { AppSource } from 'src/db/data-source';
import {
  ACCOUNT_CLASSES,
  CARD_NETWORKS,
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from 'src/entity_types/entity_types.data';

config();

// data
const accountClasses = ACCOUNT_CLASSES;
const cardNetworks = CARD_NETWORKS;
const transactionCategories = TRANSACTION_CATEGORIES;
const transactionTypes = TRANSACTION_TYPES;

async function seed() {
  await AppSource.initialize();

  // initialize each Repository (must have an existing table already)
  // loop for each data
  // if exists - edit
  // else - create new
  // destroy to close all database connections
}

seed().catch((error) => {
  console.log(error);
});
