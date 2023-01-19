export interface CreateUserDevice {
  name: string;
  type: string;
  owner_id: string;
}

export type UpdateDevice = {
  id: string;
  name: string;
  attributes?: {
    create: CreateAttribute[];
    update: UpdateAttribute[];
    remove: RemoveAttribute[];
  };
  keyValues?: UpdateKeyValue[];
};

// Attributes
export type CreateAttribute = {
  name: string;
  type: string;
};

export type UpdateAttribute = {
  id: string;
  name: string;
  type: string;
};

export type RemoveAttribute = {
  id: string;
};

// KeyValues

export type UpdateKeyValue = {
  key: string;
  value: string;
};
