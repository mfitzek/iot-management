export interface CreateUserDevice {
  name: string;
  type: string;
  owner_id: string;
  attributes?: CreateAttribute[];
  keyValues?: KeyValue[];
}

export type UpdateDevice = {
  id: string;
  name: string;
  attributes?: {
    create: CreateAttribute[];
    update: UpdateAttribute[];
    remove: RemoveAttribute[];
  };
  keyValues?: KeyValue[];
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

export type KeyValue = {
  key: string;
  value: string;
};
