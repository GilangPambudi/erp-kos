<?php

namespace App\Http\Requests\Settings;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'total_capacity' => 'required|integer|min:1',
            'standard_monthly_rate' => 'required|numeric|min:0',
            'facility_description' => 'nullable|string',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => is_string($this->name) ? trim(preg_replace('/\s+/', ' ', $this->name)) : $this->name,
        ]);
    }
}
