// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import axios from "axios";
import Logger from "js-logger";
import { Utils } from "@/js/Utils.ts";

interface StartRequestData {
  readonly userId: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
}

export interface ChallengeDetails {
  id: string;
  userId: string;
  token: string;
  areaHeight: number;
  areaLeft: number;
  areaTop: number;
  areaWidth: number;
  imageHeight: number;
  imageWidth: number;
  noseHeight: number;
  noseLeft: number;
  noseTop: number;
  noseWidth: number;
}

export class RemoteStarter {
  static startChallenge(
    successCallback: (challengeDetails: ChallengeDetails) => void,
    errorCallback: (error: Error) => void
  ): void {
    const url: string = Utils.getConfig().API_URL + Utils.getConfig().API_START_ENDPOINT;
    const startRequestData: StartRequestData = {
      userId: Utils.getUserId(),
      imageWidth: Utils.getMediaStreamInfo().actualWidth,
      imageHeight: Utils.getMediaStreamInfo().actualHeight
    };
    Logger.info(`calling ${url}`);
    Logger.info(startRequestData);
    axios
      .post(url, startRequestData)
      .then(function(response: any) {
        Logger.info(response);
        const challengeDetails: ChallengeDetails = response.data;
        const userDetails = JSON.stringify(response.data.token);
        window.localStorage.setItem("challengeDetails", userDetails);
        Logger.info(challengeDetails);
        successCallback(challengeDetails);
      })
      .catch(function(error: any) {
        Logger.error(error);
        errorCallback(error);
      });
  }
}
