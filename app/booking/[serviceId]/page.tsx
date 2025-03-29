              <p className="text-slate-600 dark:text-slate-400">+7 (999) 123-45-67</p>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Комментарий к записи (не обязательно)</p>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300"
                placeholder="Ваш комментарий..."
                rows={3}
              ></textarea>
            </div>
          </div>
          
          <div className="glass-card p-4 mb-6">
            <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">Итого</h3>
            
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 mb-2">
              <span>Стоимость услуги</span>
              <span className="font-medium">{service.price}</span>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
            
            <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-medium">
              <span>Итого к оплате</span>
              <span className="text-lg">{service.price}</span>
            </div>
          </div>
          
          <Button 
            className="w-full gradient-button font-medium py-5" 
            radius="xl"
            onClick={handleContinue}
          >
            Подтвердить запись
          </Button>
        </>
      )}
    </div>
  )
} 