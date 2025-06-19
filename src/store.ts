import type { Diagnostic } from './diagnostic';
import { fmt_path } from './files';
import type { CTX } from './ctx';

/**
 * Stores the diagnostics in an easy to use way, whilst keeping track of counts.
 */
export class DiagnosticStore {
	public readonly store = new Map<string, Diagnostic[]>();

	public warning_count = 0;
	public error_count = 0;

	get count() {
		return this.warning_count + this.error_count;
	}

	public filtered_error_count = 0;
	public filtered_warning_count = 0;

	get filtered_count() {
		return this.filtered_warning_count + this.filtered_error_count;
	}

	constructor(
		private readonly ctx: CTX,
		private readonly changed_files: string[] | null,
	) {}

	add(diagnostic: Diagnostic) {
		if (this.changed_files && !this.changed_files.includes(diagnostic.path)) {
			return;
		}

		const current = this.store.get(diagnostic.path) ?? [];
		current.push(diagnostic);
		this.store.set(diagnostic.path, current);

		this[`${diagnostic.type}_count`]++;

		if (this.ctx.config.fail_filter(fmt_path(diagnostic.path, this.ctx))) {
			this[`filtered_${diagnostic.type}_count`]++;
		}
	}

	entries() {
		return this.store.entries();
	}
}
