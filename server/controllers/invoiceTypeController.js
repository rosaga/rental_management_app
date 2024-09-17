const db = require('../db')

const createNewInvoiceType = async (invoiceTypeData) => {
    try{

        const newInvoiceType = await db('invoice_types')
        .insert({
            invoiceTypeID: invoiceTypeData.invoiceTypeID,
            invoiceType: invoiceTypeData.invoiceType
        })
        .returning('*')
        return newInvoiceType

    } catch (error) {
        throw error;
    }
}

const getAllInvoiceTypes = async (req, res) => {
    try {
        const invoiceTypes = await db('invoice_types').select('*');
        return invoiceTypes
    } catch (error) {
        throw error
    }
}

const getInvoiceTypeByID = async (invoiceTypeID) => {
    try {
        const invoiceType = await db('invoice_types').where('invoiceTypeID', invoiceTypeID).first();
        return invoiceType
    } catch (error) {
        throw error
    }
}

const updateInvoiceType = async (invoiceTypeID, updatedData) => {
    try{
        await db ('invoice_types').where({invoiceTypeID: invoiceTypeID}).update(updatedData)
        const updatedInvoiceType = await getInvoiceTypeByID(invoiceTypeID)
        return updatedInvoiceType
    }catch (error){
        throw error
    }
}

const deleteInvoiceType = async (invoiceTypeID) => {
    try{
        const deletedInvoiceType = await getInvoiceTypeByID(invoiceTypeID)
        await db('invoice_types').where({invoiceTypeID: invoiceTypeID}).del()
        return deletedInvoiceType
    } catch (error){
        throw error
    }
}

module.exports = {
    createNewInvoiceType,
    getInvoiceTypeByID,
    getAllInvoiceTypes,
    updateInvoiceType,
    deleteInvoiceType

}