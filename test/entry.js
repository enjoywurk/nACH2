var chai     = require('chai')
  , _        = require('lodash')
  , expect   = chai.expect
  , Entry  = require('../lib/entry')
  , EntryAddenda  = require('../lib/entry-addenda')
  , Batch  = require('../lib/batch')
  , File   = require('../lib/file');

describe('Entry', function(){
  describe('Create Entry', function(){
    it('should create an entry successfully', function(){
      var entry = new Entry({
    		receivingDFI: '081000210',
    		DFIAccount: '12345678901234567',
    		amount: '3521',
        transactionCode: '22',
    		idNumber: 'RAj##23920rjf31',
    		individualName: 'Glen Selle',
    		discretionaryData: 'A1'
    	});
      entry.generateString(function(string) {
        console.log(string);
      });
    });
  });
});

describe('Batch', function(){
  describe('Create Batch', function(){
    it('should create an batch successfully', function(){
      var entry = new Batch({
        serviceClassCode: '220',
        standardEntryClassCode: 'CCD',
        companyName: 'ABISF',
        companyIdentification: '58473723',
        companyEntryDescription: 'Payroll',
        companyDescriptiveDate: '031320',
        effectiveEntryDate: '031320',
        originatingDFI: '302075306'
      });
      entry.generateString(function(string) {
        console.log(string);
      });
    });
  });
});

  describe('Create Entry with addenda', function(){
    it('should create an entry with an addenda successfully', function(){
      var entry = new Entry({
        receivingDFI: '081000210',
        DFIAccount: '12345678901234567',
        amount: '3521',
        transactionCode: '22',
        idNumber: 'RAj##23920rjf31',
        individualName: 'Glen Selle',
        discretionaryData: 'A1',
        traceNumber: '000000001234567'
      });
      var addenda = new EntryAddenda({
        paymentRelatedInformation: "0123456789ABCDEFGJIJKLMNOPQRSTUVWXYXabcdefgjijklmnopqrstuvwxyx"
      });
      expect(entry.getRecordCount()).to.equal(1);
      entry.addAddenda( addenda );
      expect(entry.get('addendaId')).to.equal('1');
      expect(entry.getRecordCount()).to.equal(2);
      expect(addenda.get('addendaSequenceNumber')).to.equal(1);
      expect(addenda.get('entryDetailSequenceNumber')).to.equal('1234567');
      var addenda2 = new EntryAddenda({
        paymentRelatedInformation: "0123456789ABCDEFGJIJKLMNOPQRSTUVWXYXabcdefgjijklmnopqrstuvwxyx"
      });
      entry.addAddenda( addenda2 );
      expect(entry.get('addendaId')).to.equal('1');
      expect(entry.getRecordCount()).to.equal(3);
      // expect(addenda.get('addendaSequenceNumber')).to.equal(2);
      expect(addenda.get('entryDetailSequenceNumber')).to.equal('1234567');
      entry.generateString(function(string) {
        console.log(string);
      });
    });
  });
