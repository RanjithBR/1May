const template = document.createElement('template');
template.innerHTML = `
<div class="form-field">
<label>Enter name:</label>
    <input type="type" onkeypress="return (event.charCode !=8 && event.charCode ==0 || ( event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)))"  />
 	<span class="error">This field is required!</span>
</div>`;

class FormField extends HTMLElement {
    constructor() {
        super();
	this._shadowRoot = this.attachShadow({
            'mode': 'open'
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
	this.$label = this.shadowRoot.querySelector("label");
	this.$input = this.shadowRoot.querySelector("input");
	this.$error = this.shadowRoot.querySelector(".error");
}
	static get observedAttributes() 
	{
   		return ["label", "type", "error-message"];
	}
	attributeChangedCallback(name, oldValue, newValue) {
	    switch (name) {
        	case "label":
            	this.$label.innerText = newValue;
            	break;
        	case "type":
            	this.$input.type = newValue;
                break;
    		case "error-message":
	        this.$error.innerText = newValue;
        	break;
	        default:
                break;
    }
    }
}

window.customElements.define('db-form-field', FormField);