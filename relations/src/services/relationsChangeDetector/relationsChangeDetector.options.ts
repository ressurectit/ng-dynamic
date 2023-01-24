import {isPresent} from '@jscrpt/common';

/**
 * Options for RelationsChangeDetector
 */
export class RelationsChangeDetectorOptions
{
    //######################### public properties #########################

    /**
     * Indication whether run detection in single run, new changes added to same run, or new changes added to next run
     */
    public detectionInSingleRun: boolean = true;

    //######################### constructor #########################
    constructor(detectionInSingleRun?: boolean)
    {
        if(isPresent(detectionInSingleRun))
        {
            this.detectionInSingleRun = detectionInSingleRun;
        } 
    }
}