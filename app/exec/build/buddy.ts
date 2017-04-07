import { TfCommand } from "../../lib/tfcommand";
import args = require("../../lib/arguments");
import buildBase = require("./default");
import buildClient = require("vso-node-api/BuildApi");
import buildContracts = require("vso-node-api/interfaces/BuildInterfaces");
import trace = require("../../lib/trace");
import git = require("simple-git");
import Q = require("q")

export function describe(): string {
	return "queue a build";
}

export function getCommand(args: string[]): BuildQueue {
	return new BuildQueue(args);
}

export class BuildQueue extends buildBase.BuildBase<buildBase.BuildArguments, buildContracts.Build> {

	protected description = "Queue a build.";
	protected serverCommand = false;

	protected getHelpArgs(): string[] {
		return [];
	}

	public exec(): Promise<buildContracts.Build> {
	 let g = git();
	 let listRemote = Q.nbind(g.listRemote, g);
	 //let revparse = Q.nbind(git.revparse, g);
	 	 
		  
	// return Promise.all([, revparse(['HEAD'])]).then(function (data)  {
	// 	trace.info(data[0]);
	// 	trace.info(data[1]);
	return listRemote(['--get-url']).then(function(r) {
		trace.info(r);
	 	throw new Error("sadness");
	 })
	 
		
	}

	public friendlyOutput(build: buildContracts.Build): void {
		if (!build) {
			throw new Error("no build supplied");
		}

		trace.println();
		trace.info(build);
	}
}