import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { processInfo } from './model/processModel';

enum Api {
  CreateProcess = '/sys-api/process/create',
  UpdateProcess = '/sys-api/process/update',
  GetProcessList = '/sys-api/process/list',
  DeleteProcess = '/sys-api/process/delete',
  GetProcessById = '/sys-api/process',
}

/**
 * @description: Get role list
 */

export const getprocessList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<processInfo>>(
    { url: Api.GetProcessList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new role
 */
export const createprocess = (params: processInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateProcess, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the role
 */
export const updateprocess = (params: processInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateProcess, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete roles
 */
export const deleteprocess = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProcess, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get role By ID
 */
export const getprocessById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<processInfo>>(
    { url: Api.GetProcessById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
