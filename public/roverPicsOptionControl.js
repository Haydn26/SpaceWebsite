var Select_List_Data = {
    'cameras' : {
        curiosity: {
            text: ['Front Hazard Avoidance Camera', 'Rear Hazard Avoidance Camera', 'Mast Camera', 'Chemistry and Camera Complex', 'Mars Hand Lens Imager', 'Mars Descent Imager', 'Navigation Camera'],
            value: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM']
        },
        opportunity: {
            text: ['Front Hazard Avoidance Camera', 'Rear Hazard Avoidance Camera', 'Navigation Camera', 'Panoramic Camera', 'Miniature Thermal Emission Spectrometer (Mini-TES)'],
            value: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
        },
        spirit: {
            text: ['Front Hazard Avoidance Camera', 'Rear Hazard Avoidance Camera', 'Navigation Camera', 'Panoramic Camera', 'Miniature Thermal Emission Spectrometer (Mini-TES)'],
            value: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
        }
    }
};

function removeAllOptions(sel, removeGrp) {
    var len, groups, par;
    if (removeGrp) {
        groups = sel.getElementsByTagName('optgroup');
        len = groups.length;
        for (var i=len; i; i--) {
            sel.removeChild( groups[i-1] );
        }
    }
    
    len = sel.options.length;
    for (var i=len; i; i--) {
        par = sel.options[i-1].parentNode;
        par.removeChild( sel.options[i-1] );
    }
}

function appendDataToSelect(sel, obj) {
    var f = document.createDocumentFragment();
    var labels = [], group, opts;
    
    function addOptions(obj) {
        var f = document.createDocumentFragment();
        var o;
        
        for (var i=0, len=obj.text.length; i<len; i++) {
            o = document.createElement('option');
            o.appendChild( document.createTextNode( obj.text[i] ) );
            
            if ( obj.value ) {
                o.value = obj.value[i];
            }
            
            f.appendChild(o);
        }
        return f;
    }
    
    if ( obj.text ) {
        opts = addOptions(obj);
        f.appendChild(opts);
    } else {
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) {
                labels.push(prop);
            }
        }
        
        for (var i=0, len=labels.length; i<len; i++) {
            group = document.createElement('optgroup');
            group.label = labels[i];
            f.appendChild(group);
            opts = addOptions(obj[ labels[i] ] );
            group.appendChild(opts);
        }
    }
    sel.appendChild(f);
}

document.forms['RoverForm'].elements['rovers'].onchange = function(e) {
    var relName = 'cameras';
    
    var relList = this.form.elements[ relName ];
    
    var obj = Select_List_Data[ relName ][ this.value ];
    
    removeAllOptions(relList, true);
    

    appendDataToSelect(relList, obj);
};


(function() { 
    
    var form = document.forms['RoverForm'];
    
    var sel = form.elements['rovers'];
    sel.selectedIndex = 0;
    
    var relName = 'cameras';
    var rel = form.elements[ relName ];
    
    var data = Select_List_Data[ relName ][ sel.value ];
    
    appendDataToSelect(rel, data);
    
}());