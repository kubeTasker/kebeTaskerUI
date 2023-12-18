import { BaseListResp } from '../../model/baseModel';

/**
 *  @description: the items for process list table
 */
export interface processInfo {
  id?: number;
  type?: number;
  trans?: string;
  parentId?: number;
  path?: string;
  name?: string;
  redirect?: string;
  component?: any;
  sort?: number;
  disabled?: boolean;
  createdAt?: number;
  updatedAt?: number;
}

/**
 *  @description: process list response model
 */
export type MenuListResp = BaseListResp<processInfo>;
